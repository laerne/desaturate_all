// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

'use strict';

const Clutter = imports.gi.Clutter;
const St = imports.gi.St;
const Meta = imports.gi.Meta;
const Shell = imports.gi.Shell;
const Main = imports.ui.main;
const ExtensionUtils = imports.misc.extensionUtils;

let button;
let extension_icon;
let color_effect;

const Keybindings = {
    SchemaId: 'org.gnome.shell.extensions.desaturate-all.keybindings',
    Keys: {TOGGLE: 'toggle'},
    enable: () => {
        const settings = ExtensionUtils.getSettings(Keybindings.SchemaId);

        Main.wm.addKeybinding(
            Keybindings.Keys.TOGGLE,
            settings,
            Meta.KeyBindingFlags.NONE,
            Shell.ActionMode.ALL,
            _toggleEffect
        );
    },
    disable: () => {
        Main.wm.removeKeybinding(Keybindings.Keys.TOGGLE);
    }
};

async function _toggleEffect() {
    const effectName = 'desaturate-all-effect';
    const factorPropName = `@effects.${effectName}.factor`;

    const transition = Clutter.PropertyTransition.new(factorPropName);
    transition.progress_mode = Clutter.AnimationMode.LINEAR;
    transition.duration = 1500;
    transition.remove_on_complete = true;

    // We can't set integer values -- 0 and 1 -- for the factor, because doing
    // so seems to get converted to integer GObject Values.  Clutter is unable
    // to interpolate between integer data types. Since there is no distinct
    // floating point type versus integer type in JavaScript, it seems the only
    // way to force a floating type is to set non-integer factor values here.
    transition.set_from(0.0001);
    transition.set_to(0.9999);

    if ( Main.uiGroup.has_effects( color_effect ) ) {
        transition.direction = Clutter.TimelineDirection.BACKWARD;
        await animate(Main.uiGroup, transition);
        color_effect.factor = 0;
        Main.uiGroup.remove_effect(color_effect);
    } else {
        Main.uiGroup.add_effect_with_name(effectName, color_effect);
        await animate(Main.uiGroup, transition);
        color_effect.factor = 1;
    }
}

async function animate(actor, transition) {
    const transitionName = 'desaturate-all-effect-animation';
    return new Promise((resolve) => {
        transition.connect('stopped', resolve);
        actor.add_transition(transitionName, transition);
    });
}

function init() {
    //Creation of button
    button = new St.Bin({ style_class: 'panel-button',
                          reactive: true,
                          can_focus: true,
                          x_fill: true,
                          y_fill: false,
                          track_hover: true });
    extension_icon = new St.Icon({ icon_name: 'applications-graphics-symbolic',
                                   style_class: 'system-status-icon' });
    button.set_child(extension_icon);

    // Set the initial value of the desaturation/grayscale effect to 0; it will
    // be animated to 1 later when the effect is enabled.
    color_effect = Clutter.DesaturateEffect.new(0);
    
    //Signal connection
    button.connect('button-press-event', _toggleEffect);
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 0);
    Keybindings.enable();
}

function disable() {
    Main.panel._rightBox.remove_child(button);
    Keybindings.disable();
}

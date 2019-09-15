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

const Clutter = imports.gi.Clutter;
const St = imports.gi.St;
const Gio = imports.gi.Gio;
const Meta = imports.gi.Meta;
const Shell = imports.gi.Shell;
const Main = imports.ui.main;

const SETTINGS_SCHEMA_ID = 'org.gnome.shell.extensions.desaturate-all.keybindings';
const TOGGLE_KEY_NAME = 'toggle';

let button;
let extension_icon;
let color_effect;

function _toggleEffect() {
    if ( Main.uiGroup.has_effects( color_effect ) ) {
        Main.uiGroup.remove_effect( color_effect );
    } else {
        Main.uiGroup.add_effect( color_effect );
    }
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

    //Creation of effect
    color_effect = new Clutter.DesaturateEffect();
    
    //Signal connection
    button.connect('button-press-event', _toggleEffect);
}

function enable() {
    Main.panel._rightBox.insert_child_at_index(button, 0);

    Main.wm.addKeybinding(TOGGLE_KEY_NAME,
        new Gio.Settings({schema: SETTINGS_SCHEMA_ID}),
        Meta.KeyBindingFlags.NONE,
        Shell.ActionMode.ALL,
        _toggleEffect);
}

function disable() {
    Main.panel._rightBox.remove_child(button);

    Main.wm.removeKeybinding(TOGGLE_KEY_NAME);
}

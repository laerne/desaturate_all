Installation
============

Using a terminal, you can do the following sequence of commands :

```
$ git clone https://github.com/laerne/desaturate_all.git
$ mv desaturate_all "~/.local/share/gnome-shell/extensions/desaturate_all@nicolas.brack.mail.be"
$ mkdir -p ~/.local/share/glib-2.0/schemas
$ cp -r ~/.local/share/gnome-shell/extensions/desaturate_all@nicolas.brack.mail.be/schemas/* ~/.local/share/glib-2.0/schemas
$ glib-compile-schemas ~/.local/share/glib-2.0/schemas
```

To enable the keyboard shortcut, GSettings needs to know where the schema file is. So you need to update `XDG_DATA_DIRS` in the file ~/.profile:
```
# Look for GNOME Shell Extension keybindings.
export XDG_DATA_DIRS=~/.local/share:$XDG_DATA_DIRS
```

Then log out and log back into GNOME.

You can now enable the extension by running `gnome-shell-extension-prefs`, or by browsing to https://extensions.gnome.org/local.




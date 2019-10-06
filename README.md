Installation
============

Using a terminal, you can do the following sequence of commands:

```
$ git clone https://github.com/laerne/desaturate_all.git
$ mv desaturate_all "~/.local/share/gnome-shell/extensions/desaturate_all@nicolas.brack.mail.be"
```

Then press `Alt`+`F2`, type `r` in the dialog window, then press `Enter`.

The default keyboard shortcut to toggle desaturation is `<Super>`+`e`. You can
change this shortcut key using `gsettings`. For example, to change the keyboard
shortcut to `<Ctrl>`+`e`, run the following command:

```
gsettings --schemadir \
  ~/.local/share/gnome-shell/extensions/desaturate_all@nicolas.brack.mail.be/schemas \
  set org.gnome.shell.extensions.desaturate-all.keybindings toggle "['<Ctrl>E']"
```

You can now enable the extension by running `gnome-shell-extension-prefs`, or by
browsing to https://extensions.gnome.org/local.

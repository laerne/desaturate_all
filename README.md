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

**Running with Ubutun20:** Before you can execute the commands above, you have to install a few programms. 
```
$ sudo apt-get install gnome-tweaks gnome-shell-extensions

After installing this programs, you can seach for *"Addons"* and activate the Option *"desaturate_all"*. 
Finally you have got a icon with a picutre in your gnome-shell. 

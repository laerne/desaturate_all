Installation
============

Using a terminal, you can do the following sequence of commands :

```
$ git clone https://github.com/laerne/desaturate_all.git
$ mv desaturate_all "~/.local/share/gnome-shell/extensions/desaturate_all@nicolas.brack.mail.be"
$ mkdir -p ~/.local/share/glib-2.0/schemas
$ ln -sr ~/.local/share/gnome-shell/extensions/desaturate_all@nicolas.brack.mail.be/schemas/* ~/.local/share/glib-2.0/schemas
$ glib-compile-schemas ~/.local/share/glib-2.0/schemas
```

Then log out and log back into GNOME. (Instead, you might be able to just press
`Alt`+`F2`, type `r`, then press `Enter`.)

You can now enable the extension by running `gnome-shell-extension-prefs`, or by
browsing to https://extensions.gnome.org/local.

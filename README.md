
# Moodle plugin: local_keyboard_shortcuts

Adds gmail-style keyboard shortcuts.

Just type `g` then `u` and see what happens !

Does **not** fire if you are inside of a `textarea`, `input`, or `select` to prevent undesirable things from happening.

## Shortcuts

### Navigation

| Shortcut | Scope |  Description |
|---|---|---|
| g d | User | Go to Dasbhoard |
| g m | User | Go to Messaging page |
| g c | Teacher | Go to cohort management page |
| g u | Admin | Go to user management page |
| g r | Admin | Go to role management page |
| g p | Admin | Go to plugin management page |

### Actions

| Shortcut | Scope |  Description |
|---|---|---|
| s e | Teacher | Switch edition mode on/off |
| s r | Admin | Switch role (and back) |

### Overlays

| Shortcut | Scope |  Description |
|---|---|---|
| ? | User | Display help |
| / | User | Display search |

## Build

```
docker-compose down -v
docker-compose run --rm build

git add amd/build/
git commit -m '.......'
git push
```

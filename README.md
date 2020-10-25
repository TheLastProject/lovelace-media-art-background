# Lovelace Media Art Background

Set the currently playing media art as background image for Lovelace (Home Assistant).

## Configuration 

You need to put this at the top of your Lovelace configuration.

1. Open your Home Assistant website
2. Click the 3 dots on the top-right
3. Click "Edit Dashboard"
4. Click the 3 dots on the top-right
5. Click "Raw Configuration Editor"
6. Add the configuration:

```yaml
media_art_background:
  entities:
    - media_player.living_room_tv
```

**Note** Make sure to put it right at the top, not inside a view or anything. So it will look something like this:

```
media_art_background:
  entities:
    - media_player.living_room_tv
title: Home
views:
  - title: Today
    path: today
    icon: 'mdi:clock'
    badges:
      - entity: sensor.time
```

Here is another example showing all the different settings:

```yaml
media_art_background:
  blur: 10px
  opacity: 0.5
  transition_opacity: 2s
  entities:
    - media_player.main
    - entity: media_player.secondary
      valid_states: ['playing']
      image_attribute: 'entity_picture'
```

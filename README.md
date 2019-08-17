# Lovelace Media Art Background

Set the currently playing media art as background image for Lovelace (Home Assistant).

## Configuration 

Ex:
```yaml
resources:
  - url: /community_plugin/lovelace-media-art-background/media-art-background.js
    type: module
media_art_background:
  entities:
    - media_player.main
    - entity: media_player.secondary
      valid_states: ['playing']
      image_attribute: 'entity_picture'
```

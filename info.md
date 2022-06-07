# Lovelace Minimalist Card
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg?style=for-the-badge)](https://github.com/hacs/integration)

![Cards](/docs/imgs/cards.gif)


Install on HACS using the "Custom repositories" option.


#### Setup in resources
```
resources:
  - url: /hacsfiles/lovelace-minimalist-card/minimalist-card.js
    type: js
```


#### Card options
| Name | Type | Default | Description |
|------|------|---------|-------------|
| type | string | **required** | `custom:minimalist-card`|
| entity_primary | string | optional | example: `sensor.time` |
| color_primary | string | var(--primary-text-color) | Main entity state color |
| size_primary | integer | 10 | Main entity state size |
| entity_secondary | string | optional | example: `sensor.date` |
| color_secondary | string | var(--disabled-color) | Secondary entity state color |
| size_secondary | integer | 3 | Secondary entity state size |
| title | string | optional | example: `Home Assistant Brazil` |
| color_title | string | var(--disabled-color) | Change title color |
| size_title | integer | 3 | Title font size |
| title_position | string | `top` | Title position in layout `top` `middle` `bottom` |
| align | integer | `center` | Set align with `center` `left` `right`|
| margin | integer | 5 | Space between entities or title, if any. |
| background | integer | var(--ha-card-background) | Card background color |






#### Basic setup
```
type: custom:minimalist-card
entity_primary: sensor.time
```


#### Example with one entity
```
type: custom:minimalist-card
entity_primary: sensor.time
color_primary: var(--primary-color)
size_primary: 12
```

#### Example with title only
```
type: custom:minimalist-card
title: Home Assistant Brazil
size_title: 6
margin: 20
```



#### Example with two entities 
```
type: custom:minimalist-card
entity_primary: sensor.time
color_primary: var(--primary-text-color)
size_primary: 10
entity_secondary: sensor.date
color_secondary: var(--disabled-color)
size_secondary: 3
margin: 5
align: left
```

#### Example with title and two entities 
```
type: custom:minimalist-card
entity_primary: sensor.time
color_primary: var(--primary-text-color)
size_primary: 10
entity_secondary: sensor.date
color_secondary: var(--disabled-color)
size_secondary: 3
title: Home Assistant Brazil
title_position: bottom
margin: 5
align: left
```


#### Examples of positions
```
type: custom:minimalist-card
entity_primary: sensor.time
entity_secondary: sensor.date
position: left
```

```
type: custom:minimalist-card
entity_primary: sensor.time
entity_secondary: sensor.date
position: right
```



#### Examples with background color
```
type: custom:minimalist-card
entity_primary: sensor.time
entity_secondary: sensor.date
background: var(primary-color)
# Accepts hex, rgb, rgba and background image
```



Inspired by the [Bignumber Card](https://github.com/custom-cards/bignumber-card)

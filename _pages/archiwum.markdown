---
layout: page
title: Archiwum
permalink: /archiwum/
---
{% assign postsByYearMonth = site.posts | where:"archive",true | group_by_exp:"post", "post.date | date: '%b %Y'"  %}
{% for yearMonth in postsByYearMonth %}

  {% assign m = yearMonth.name | date: "%-m" %}
  <h3 class='archive-month-header'>{% case m %}
      {% when '1' %}Styczeń
      {% when '2' %}Luty
      {% when '3' %}Marzec
      {% when '4' %}Kwiecień
      {% when '5' %}Maj
      {% when '6' %}Czerwiec
      {% when '7' %}Lipiec
      {% when '8' %}Sierpień
      {% when '9' %}Wrzesień
      {% when '10' %}Październik
      {% when '11' %}Listopad
      {% when '12' %}Grudzień
    {% endcase %}
    {{ yearMonth.name | date: "%Y" }}</h3>
  <ul class='archive-month-list'>
      {% for post in yearMonth.items %}
        <li class='archive-item'><a class='archive-item-link' href="{{ post.url | relative_url }}"><img class='archive-thumb-img img-circle' src='{{ post.head-image | default: '/apple-touch-icon.png' | relative_url }}' alt='{{ post.title }}'>{{ post.title }}</a></li>
      {% endfor %}
  </ul>
{% endfor %}

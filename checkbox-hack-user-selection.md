

```

{% if blogs.charities %}
  <div class="charity-selector">
    <ul class="product-grid just">
      {% for charity in blogs.charities.articles %}

        <li class="charity-selector__radio-btn counter{% increment %} ">

          <label for="{{ charity.title | handleize}}-toggle">
            <img src="{{ charity.image.src | img_url: 'medium' }}" alt="{{ charity.title | handleize }}" /><br/>
            {{ charity.title }}
          </label>
          {% include 'uparrow' %}
        </li>

      {% endfor %}
    </ul>

  {% for charity in blogs.charities.articles %}
    <div>
      <input required class="required" id="{{ charity.title | handleize }}-toggle" type="radio" name="attributes[Selected Charity]" value="{{ charity.title }}"{% if cart.attributes["charities"] == "{{ charity.title }}" %} checked{% endif %}>
      <div class="charity-selector__content">
        {{ charity.content }}
      </div>
    </div>
  {% endfor %}

  </div>
{% endif %}


{{ 'jquery-3.1.0.min.js' | asset_url | script_tag }}

<script type="text/javascript">

  $('.counter0').on('click', function(){
    $('.charity-uparrow').css('visibility', 'hidden');
    $('.counter0 > .charity-uparrow').css('visibility', 'visible');
  });
  $('.counter1').on('click', function(){
    $('.charity-uparrow').css('visibility', 'hidden');
    $('.counter1 > .charity-uparrow').css('visibility', 'visible');
  });
  $('.counter2').on('click', function(){
    $('.charity-uparrow').css('visibility', 'hidden');
    $('.counter2 > .charity-uparrow').css('visibility', 'visible');
  });
  $('.counter3').on('click', function(){
    $('.charity-uparrow').css('visibility', 'hidden');
    $('.counter3 > .charity-uparrow').css('visibility', 'visible');
  });


</script>

```

{% extends "base.tpl" %}

{% block style %}
{{helper.require('index', 'css')}}
{% endblock %}

{% block content %}
<div id="root"></div>
{{helper.require('index', 'js')}}
{% endblock %}

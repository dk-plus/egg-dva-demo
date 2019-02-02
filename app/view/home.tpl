{% extends "base.tpl" %}


{% block content %}
{{helper.require('index', 'css')}}
<div id="root"></div>
{{helper.require('index', 'js')}}
{% endblock %}

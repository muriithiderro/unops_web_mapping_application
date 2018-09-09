# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-09-08 11:29
from __future__ import unicode_literals

import django.contrib.gis.db.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('infrastructure', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='HealthCentre',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('objectid', models.IntegerField()),
                ('name', models.CharField(max_length=254)),
                ('lat', models.FloatField()),
                ('lon', models.FloatField()),
                ('osm_id', models.FloatField()),
                ('timestamp', models.CharField(max_length=20)),
                ('district', models.CharField(max_length=50)),
                ('county', models.CharField(max_length=50)),
                ('subcounty', models.CharField(max_length=50)),
                ('source', models.CharField(max_length=50)),
                ('collection', models.CharField(max_length=50)),
                ('collecti_1', models.CharField(max_length=50)),
                ('grade', models.CharField(max_length=50)),
                ('ownership', models.CharField(max_length=50)),
                ('grid_dista', models.CharField(max_length=50)),
                ('hc_name', models.CharField(max_length=254)),
                ('hc_type', models.CharField(max_length=254)),
                ('status', models.CharField(max_length=254)),
                ('x_raw', models.FloatField()),
                ('y_raw', models.FloatField()),
                ('dname_2006', models.CharField(max_length=254)),
                ('cname_2006', models.CharField(max_length=254)),
                ('sname_2006', models.CharField(max_length=254)),
                ('pname_2006', models.CharField(max_length=254)),
                ('dname_2010', models.CharField(max_length=254)),
                ('sname_2010', models.CharField(max_length=254)),
                ('subregion', models.CharField(max_length=254)),
                ('country', models.CharField(max_length=254)),
                ('x_utm', models.FloatField()),
                ('y_utm200k', models.FloatField()),
                ('geom', django.contrib.gis.db.models.fields.MultiPointField(srid=32636)),
            ],
        ),
    ]

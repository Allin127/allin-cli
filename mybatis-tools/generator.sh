#!/usr/bin/env bash
mkdir -p src/main/java
mkdir -p src/main/resources
al caster:batis generatorConfig-template.xml
java -jar mybatis-generator-core-1.3.7.jar -configfile generatorConfig.xml -overwrite

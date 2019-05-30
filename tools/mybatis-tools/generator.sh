#!/usr/bin/env bash
rm -r src
mkdir -p src/main/java
mkdir -p src/main/resources
java -jar mybatis-generator-core-1.3.7.jar -configfile generatorConfig.xml -overwrite

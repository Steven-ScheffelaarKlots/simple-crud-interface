#!/bin/bash

sudo -u postgres psql -f setup.psql 

sudo -u postgres psql -d welltok -c "COPY article(id, title, description, author, tags, created_at, updated_at)
FROM '/home/sscheffe/projects/welltok/import.csv' DELIMITER ',' CSV HEADER;"

sudo -u postgres psql -d welltok -c "SELECT setval('article_id_seq', (SELECT MAX(id) FROM article)+1);"

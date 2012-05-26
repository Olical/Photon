#!/bin/sh
DIR="$( cd "$( dirname "$0" )" && pwd )"
perl ${DIR}/NaturalDocs/NaturalDocs -i ${DIR}/../source -o HTML ${DIR}/html -p ${DIR}/project
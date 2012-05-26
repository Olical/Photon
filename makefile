# Compiles the documentation in ./docs/html
documentation:
	perl ./docs/NaturalDocs/NaturalDocs -i ./source -o HTML ./docs/html -p ./docs/project

# Creates a zip package under the specified version
# You can specify the version by passing v=X.Y.Z
package:
	@if [ -z "${v}" ]; then\
		echo "Please provide a version with v=X.Y.Z.";\
	else\
		cd source;\
		zip -r ../packages/photon-${v}.zip *;\
	fi;
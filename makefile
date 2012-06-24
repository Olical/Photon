# Downloads NaturalDocs
get-doc-tool:
	wget -O nd.zip "http://downloads.sourceforge.net/project/naturaldocs/Stable%20Releases/1.52/NaturalDocs-1.52.zip?r=http%3A%2F%2Fsourceforge.net%2Fprojects%2Fnaturaldocs%2F&ts=1340533279&use_mirror=heanet"
	unzip nd.zip -d docs/NaturalDocs
	rm nd.zip

# Compiles the documentation in ./docs/html
# Remember to run `make get-doc-tool` first
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

# Runs a simple HTTP server for testing
# Access with: http://localhost:8000/tests/SpecRunner.html
server:
	python -m SimpleHTTPServer
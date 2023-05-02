#!/usr/bin/env bash

set -euo pipefail
SCRIPTDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

log() { echo "$1" >&2; }

TAG="v1.0.0"
REPO_PREFIX="registry.digitalocean.com/showcase-registry"

while IFS= read -d $'\0' -r dir; do
    # build image
    svcname="$(basename "${dir}")"
    builddir="${dir}"
    #PR 516 moved cartservice build artifacts one level down to apps
    if [ $svcname == "cartservice" ]
    then
        builddir="${dir}/apps"
    fi
    ## skipping loadgenerator service building as it's used only in CI for tests
    if [ $svcname == "loadgenerator" ]
    then
        continue
    fi
    image="${REPO_PREFIX}/$svcname:$TAG"
    (
        cd "${builddir}"
        log "Building and pushing: ${image}"
        ## we are not using the --publish pack flag due to an issue preventing the pack CLI from pushing to DOCR
        pack build ${image} --builder gcr.io/buildpacks/builder:v1
        docker push ${image}
    )
done < <(find "${SCRIPTDIR}/../apps" -mindepth 1 -maxdepth 1 -type d -print0)

log "Successfully built and pushed all images."

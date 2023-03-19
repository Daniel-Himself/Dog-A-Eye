.PHONY: all
.SILENT: all

all:
	conda env create -f environment.yaml
	@echo "Done Initializing. Run 'conda activate DogVision' to activate the environment."

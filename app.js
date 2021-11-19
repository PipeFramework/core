const chalk = require("chalk");
const fs = require("fs");

const FILTERS_DIRECTORY_NAME = "filters";
const CONFIG_FILTERS_NAME = "config-filters";

const start = () => {
  console.log(chalk.green("Starting pipeframework... \n"));

  try {
    checkFilesAndDirectories(FILTERS_DIRECTORY_NAME, CONFIG_FILTERS_NAME);
  } catch (error) {
    console.log(chalk.red(error.message));
    process.exit(1);
  }
};

/**
 * Check if the filters directory exists.
 * @param string filterDirectoryName
 */
const checkDirectory = (filterDirectoryName) => {
  if (!fs.existsSync(`${process.cwd()}/${filterDirectoryName}`)) {
    throw new Error(
      `${filterDirectoryName
        .charAt(0)
        .toUpperCase()}${filterDirectoryName.slice(1)} directory not found.`
    );
  }
};

/**
 * Check if all the filter modules are valid.
 * @param string filterDirectoryName
 * @returns [string]
 */
const findFilterModules = (filterDirectoryName) => {
  const files = fs.readdirSync(`${process.cwd()}/${filterDirectoryName}`);
  if (files.length === 0) {
    throw new Error(`No filters modules found.`);
  }

  return files;
};

/**
 * Check if is a valid filter module.
 * @param {*} filterModule
 */
const isModule = (filterModule) => {
  if (typeof filterModule !== "function") {
    throw new Error(`${filterModule} is not a filter module.`);
  }
};

/**
 * Check if configuration file for filters is valid
 * @param string configFiltersName
 */
const isValidConfiguration = (configFiltersName) => {
  if (!fs.existsSync(`${process.cwd()}/${configFiltersName}.json`)) {
    throw new Error("Configuration file not found");
  }

  const rawData = fs.readFileSync(`${process.cwd()}/${configFiltersName}.json`);

  let config;
  try {
    config = JSON.parse(rawData);
  } catch {
    throw new Error("Configuration file is not a valid json file.");
  }

  if (!config.steps) {
    throw new Error("The steps key is not found");
  }

  const configKeys = Object.keys(config.steps);

  configKeys.forEach((key) => {
    if (!config.steps[key].filter) {
      throw new Error(`The filter key not found on step ${key}`);
    }

    if (config.steps[key].params && !Array.isArray(config.steps[key].params)) {
      throw new Error(`The params key is not an array for the step ${key}`);
    }

    if (
      config.steps[key].next &&
      !configKeys.includes(config.steps[key].next)
    ) {
      throw new Error(
        `Step with id ${config.steps[key].next} not found. (Next value for for the step ${key})`
      );
    }
  });
};

/**
 * Check files and directories
 * @param string filtersDirectoryName
 */
const checkFilesAndDirectories = (filtersDirectoryName, configFiltersName) => {
  checkDirectory(filtersDirectoryName);

  const filterModules = findFilterModules(filtersDirectoryName);
  filterModules.forEach((module) => {
    isModule(require(`${process.cwd()}/${filtersDirectoryName}/${module}`));
  });

  console.log(chalk.yellow("Filters list :"));
  filterModules.forEach((filter) => {
    console.log(`- ${filter}`);
  });

  isValidConfiguration(configFiltersName);
};

start();

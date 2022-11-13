use std::{
    fs,
    path::PathBuf,
};

use super::constants;
use chrono::prelude::*;
use serde::{Deserialize, Serialize};
use xdg;

#[derive(Debug, Deserialize, Serialize)]
pub struct Config {
    current_version: String,
    last_checked: String,
    auto_check_update: bool,
    check_interval: u32, // in minutes
}

const CONFIG_FILE_NAME: &'static str = "config.toml";

impl Config {
    fn default_config() -> Config {
        let now = Utc::now().to_string();
        Config {
            current_version: constants::APP_VERSION.to_string(),
            last_checked: now,
            auto_check_update: true,
            check_interval: 1440
        }
    }

    fn get_path() -> PathBuf {
        let config_path = xdg::BaseDirectories::with_prefix(constants::APP_NAME)
            .unwrap()
            .get_config_file(CONFIG_FILE_NAME);
        config_path
    }

    fn write_config(&self) {
        fs::write(Config::get_path(), toml::to_string_pretty(&self).unwrap()).unwrap();
    }
}

fn init_config() -> Config {
    let config_path = Config::get_path();
    fs::create_dir_all(config_path.parent().unwrap()).unwrap();
    let config: Config = if config_path.exists() {
        toml::from_slice(fs::read(config_path).unwrap().as_slice()).unwrap()
    } else {
        let default_config = Config::default_config();
        default_config.write_config();
        default_config
    };
    config
}

// TODO: check whether current_version is the newest
fn check_update(config: &Config) {
    config.auto_check_update;
    return;
}

pub fn init() -> Config {
    let config = init_config();
    check_update(&config);
    config
}

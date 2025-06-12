Set search_path to "Synoptic_Project", public;

-- Table: Plants
CREATE TABLE plants (
    plant_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    scientific_name TEXT,
    type TEXT,
    description TEXT,
    season TEXT
);

-- Table: Environmental Requirements
CREATE TABLE environmental_requirements (
    plant_id INTEGER,
    min_sunlight_hours INTEGER,
    max_sunlight_hours INTEGER,
    soil_type TEXT,
    min_rainfall_mm INTEGER,
    max_rainfall_mm INTEGER,
    min_temp_c INTEGER,
    max_temp_c INTEGER,
    FOREIGN KEY (plant_id) REFERENCES plants(plant_id)
);

-- Table: Gardening Tips
CREATE TABLE gardening_tips (
    plant_id INTEGER,
    tip_category TEXT,
    tip_text TEXT,
    FOREIGN KEY (plant_id) REFERENCES plants(plant_id)
);

-- Optional: Climate Data Table
CREATE TABLE climate_data (
    location TEXT,
    month TEXT,
    avg_temp_c REAL,
    avg_rain_mm REAL,
    sunlight_hrs REAL
);

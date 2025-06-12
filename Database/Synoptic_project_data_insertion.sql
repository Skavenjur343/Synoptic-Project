Set search_path to "Synoptic_Project", public;

INSERT INTO plants (plant_id, name, scientific_name, type, description, season) VALUES
(1, 'Tomato', 'Solanum lycopersicum', 'Vegetable', 'Fruit-bearing plant that loves sunlight', 'Summer'),
(2, 'Spinach', 'Spinacia oleracea', 'Leafy Green', 'Cool-season leafy vegetable', 'Winter'),
(3, 'Carrot', 'Daucus carota', 'Root', 'Orange root vegetable rich in beta-carotene', 'Autumn'),
(4, 'Lettuce', 'Lactuca sativa', 'Leafy Green', 'Common salad vegetable, grows quickly', 'Spring'),
(5, 'Aloe Vera', 'Aloe barbadensis', 'Medicinal', 'Succulent with healing properties', 'All Year');

INSERT INTO environmental_requirements (plant_id, min_sunlight_hours, max_sunlight_hours, soil_type, min_rainfall_mm, max_rainfall_mm, min_temp_c, max_temp_c) VALUES
(1, 6, 10, 'loamy', 60, 120, 20, 35),  -- Tomato
(2, 4, 6, 'loamy', 30, 60, 5, 25),     -- Spinach
(3, 5, 8, 'sandy', 25, 50, 12, 24),    -- Carrot
(4, 3, 6, 'clay', 40, 70, 10, 20),     -- Lettuce
(5, 6, 12, 'sandy', 20, 60, 15, 40);   -- Aloe Vera

INSERT INTO gardening_tips (plant_id, tip_category, tip_text) VALUES
(1, 'watering', 'Water deeply 2-3 times a week to encourage root growth.'),
(1, 'support', 'Use stakes or cages to support tomato plants as they grow.'),
(2, 'harvest', 'Pick spinach leaves when they are young and tender.'),
(3, 'soil', 'Loose, sandy soil helps carrots grow long and straight.'),
(4, 'pests', 'Use neem spray to prevent aphids on lettuce leaves.'),
(5, 'care', 'Allow aloe vera soil to dry completely between waterings.');

INSERT INTO climate_data (location, month, avg_temp_c, avg_rain_mm, sunlight_hrs) VALUES
('Makers Valley', 'January', 23.5, 120.0, 7.0),
('Makers Valley', 'April', 17.0, 55.0, 7.5),
('Makers Valley', 'June', 10.0, 8.0, 8.0),
('Makers Valley', 'September', 16.5, 30.0, 8.5),
('Makers Valley', 'December', 24.0, 110.0, 7.0);

CREATE OR REPLACE VIEW plant_advice_view AS
SELECT 
    p.name,
    p.type,
    p.season,
    p.description,
    e.soil_type,
    e.min_sunlight_hours,
    e.max_sunlight_hours,
    e.min_rainfall_mm,
    e.max_rainfall_mm,
    e.min_temp_c,
    e.max_temp_c,
    g.tip_category,
    g.tip_text
FROM plants p, environmental_requirements e, gardening_tips g
WHERE p.plant_id = e.plant_id
  AND p.plant_id = g.plant_id;

-- Example where soil_type is userinput
SELECT * FROM plant_advice_view WHERE soil_type = 'loamy';

CREATE OR REPLACE FUNCTION suggest_plants(
    user_sunlight INT DEFAULT NULL,
    user_rainfall INT DEFAULT NULL,
    user_temp INT DEFAULT NULL,
    user_soil TEXT DEFAULT NULL,
    user_month TEXT DEFAULT NULL
)
RETURNS TABLE (
    name TEXT,
    type TEXT,
    description TEXT,
    season TEXT
)
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.name,
        p.type,
        p.description,
        p.season
    FROM plants p
    JOIN environmental_requirements e ON p.plant_id = e.plant_id
    LEFT JOIN climate_data c ON c.month = user_month
    WHERE
        COALESCE(user_sunlight, c.sunlight_hrs) BETWEEN e.min_sunlight_hours AND e.max_sunlight_hours AND
        COALESCE(user_rainfall, c.avg_rain_mm) BETWEEN e.min_rainfall_mm AND e.max_rainfall_mm AND
        COALESCE(user_temp, c.avg_temp_c) BETWEEN e.min_temp_c AND e.max_temp_c AND
        (user_soil IS NULL OR e.soil_type = user_soil);
END;
$$ LANGUAGE plpgsql;


-- Example where parameters are userinput
SELECT * FROM suggest_plants(6, 50, 18, 'loamy');
SELECT * FROM suggest_plants(NULL, NULL, NULL, 'sandy', 'December');

CREATE FUNCTION get_gardening_tips(plant_name TEXT)
RETURNS TABLE (
    plant TEXT,
    tip_category TEXT,
    tip_text TEXT
)
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.name,
        g.tip_category,
        g.tip_text
    FROM plants p, gardening_tips g
    WHERE p.plant_id = g.plant_id
      AND p.name = plant_name;
END;
$$ LANGUAGE plpgsql;


-- Example can be used with any plant
SELECT * FROM get_gardening_tips('Tomato');

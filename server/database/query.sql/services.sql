CREATE TABLE realtop.services (
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    user_user_id INT,
    client_client_id INT,
    service_type VARCHAR(25),
    service_status VARCHAR(25),
    service_bath TEXT,
    service_bed TEXT,
    service_zip TEXT,
    service_note LONGTEXT,
    service_document LONGTEXT,
    -- rent
    service_pet BOOLEAN,
    service_from VARCHAR(25),
    service_to VARCHAR(25),
    -- buy
    service_pre_approval VARCHAR(25),


    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    -- Other common fields for services

    FOREIGN KEY (user_user_id) REFERENCES users(user_id),
    FOREIGN KEY (client_client_id) REFERENCES clients(client_id)
);
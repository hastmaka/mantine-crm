create table clients
(
    client_id        int auto_increment
        primary key,
    client_name      varchar(25) null,
    client_last_name varchar(25) null,
    client_email     varchar(50) null,
    client_phone     varchar(25) null,
    client_active    tinyint(1)  null,
    created_at       timestamp   null,
    updated_at       timestamp   null
);

create table services
(
    service_id           int auto_increment
        primary key,
    client_client_id     int         null,
    service_type         varchar(25) null,
    service_status       varchar(25) null,
    service_bath         varchar(25) null,
    service_bed          varchar(25) null,
    service_zip          text        null,
    service_note         longtext    null,
    service_document     longtext    null,
    service_pet          tinyint(1)  null,
    service_price_from   varchar(25) null,
    service_price_to     varchar(25) null,
    service_pre_approval varchar(25) null,
    created_at           timestamp   null,
    updated_at           timestamp   null,
    service_active       tinyint     null,
    constraint services_ibfk_2
        foreign key (client_client_id) references clients (client_id)
);

create table documents
(
    document_id        int auto_increment
        primary key,
    document_data      longtext null,
    service_service_id int      null,
    service_active     tinyint  null,
    constraint documents_ibfk_1
        foreign key (service_service_id) references services (service_id)
);

create index service_service_id
    on documents (service_service_id);

create table notes
(
    note_id            int auto_increment
        primary key,
    note_content       text        null,
    note_who           varchar(50) null,
    note_severity      varchar(25) null,
    service_service_id int         null,
    note_active        tinyint     null,
    constraint notes_ibfk_1
        foreign key (service_service_id) references services (service_id)
);

create index service_service_id
    on notes (service_service_id);

create index client_client_id
    on services (client_client_id);

create table users
(
    user_id        int auto_increment
        primary key,
    user_name      varchar(25) not null,
    user_last_name varchar(25) null,
    user_email     varchar(25) null,
    user_active    tinyint(1)  null,
    user_uid       varchar(50) null,
    created_at     timestamp   null
);

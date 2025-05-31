-- Create Enquiries Table
CREATE TABLE enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Universities Table
CREATE TABLE universities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    image_url VARCHAR(255)
);

-- Create Courses Table
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    university_id UUID REFERENCES universities(id),
    course_name VARCHAR(255) NOT NULL,
    course_level VARCHAR(50) NOT NULL,
    field_of_study VARCHAR(255) NOT NULL,
    duration_years INTEGER NOT NULL,
    tuition_fee_nzd DECIMAL(10, 2) NOT NULL,
    entry_requirements TEXT NOT NULL,
    exams_required VARCHAR(255) NOT NULL,
    scholarship_available BOOLEAN NOT NULL,
    scholarship_details TEXT,
    apply_link VARCHAR(255) NOT NULL
);

-- Create Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('agent', 'business_admin'))
);

-- Insert test users
INSERT INTO users (username, password, role) VALUES
('agent001', 'test123', 'agent'),
('admin001', 'admin123', 'business_admin'); 
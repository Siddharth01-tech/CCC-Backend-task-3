-- user
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'candidate',
    is_blocked BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_role_check
    CHECK (role IN ('candidate', 'recruiter', 'admin'))
);
-- File
-- this for store Resume and company logo 
CREATE TABLE files (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(100) NOT NULL,
    file_size INTEGER,
    file_url TEXT NOT NULL,
    storage_public_id VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_files_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);

-- canditate profile
CREATE TABLE candidate_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL,
    phone VARCHAR(20),
    skills TEXT[],
    education TEXT,
    experience INTEGER,
    location VARCHAR(150),
    bio TEXT,
    resume_id INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_candidate_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

    CONSTRAINT fk_candidate_resume
    FOREIGN KEY (resume_id)
    REFERENCES files(id)
    ON DELETE SET NULL,

    CONSTRAINT candidate_experience_check
    CHECK (experience IS NULL OR experience >= 0)
);

-- companies

CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    recruiter_id INTEGER NOT NULL,
    company_name VARCHAR(150) NOT NULL,
    description TEXT,
    website VARCHAR(255),
    location VARCHAR(150),
    industry VARCHAR(100),
    logo_id INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_company_recruiter
    FOREIGN KEY (recruiter_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

    CONSTRAINT fk_company_logo
    FOREIGN KEY (logo_id)
    REFERENCES files(id)
    ON DELETE SET NULL
);
-- jobs
CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    recruiter_id INTEGER NOT NULL,
    company_id INTEGER NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(150),
    job_type VARCHAR(50) NOT NULL,
    salary_min NUMERIC(12,2),
    salary_max NUMERIC(12,2),
    skills TEXT[],
    experience INTEGER,
    deadline DATE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_job_recruiter
    FOREIGN KEY (recruiter_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

    CONSTRAINT fk_job_company
    FOREIGN KEY (company_id)
    REFERENCES companies(id)
    ON DELETE CASCADE,

    CONSTRAINT job_salary_check
    CHECK (
        salary_min IS NULL
        OR salary_max IS NULL
        OR salary_min <= salary_max
    ),

    CONSTRAINT job_experience_check
    CHECK (
        experience IS NULL
        OR experience >= 0
    )
);

-- applications

CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    job_id INTEGER NOT NULL,
    candidate_id INTEGER NOT NULL,
    resume_id INTEGER,
    cover_letter TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'Applied',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_application_job
    FOREIGN KEY (job_id)
    REFERENCES jobs(id)
    ON DELETE CASCADE,

    CONSTRAINT fk_application_candidate
    FOREIGN KEY (candidate_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

    CONSTRAINT fk_application_resume
    FOREIGN KEY (resume_id)
    REFERENCES files(id)
    ON DELETE SET NULL,

    CONSTRAINT application_status_check
    CHECK (
        status IN (
            'Applied',
            'Shortlisted',
            'Interview',
            'Rejected',
            'Selected'
        )
    ),

    CONSTRAINT unique_job_application
    UNIQUE (job_id, candidate_id)
);

-- INDEXES

CREATE INDEX idx_users_email
ON users(email);

CREATE INDEX idx_users_role
ON users(role);

CREATE INDEX idx_jobs_location
ON jobs(location);

CREATE INDEX idx_jobs_job_type
ON jobs(job_type);

CREATE INDEX idx_jobs_experience
ON jobs(experience);

CREATE INDEX idx_jobs_salary
ON jobs(salary_min, salary_max);

CREATE INDEX idx_jobs_deadline
ON jobs(deadline);

CREATE INDEX idx_jobs_created_at
ON jobs(created_at);

CREATE INDEX idx_applications_job
ON applications(job_id);

CREATE INDEX idx_applications_candidate
ON applications(candidate_id);

CREATE INDEX idx_applications_status
ON applications(status);
package com.contactSchedule.springmysql.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.contactSchedule.springmysql.model.Contact;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> { }

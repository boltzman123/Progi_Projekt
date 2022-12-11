package oop.dao;

import liquibase.pro.packaged.Q;
import oop.domain.Donation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface DonationRepository extends JpaRepository<Donation, Long> {
    @Override
    Optional<Donation> findById(Long aLong);

    @Query("SELECT d FROM Donation d where :mail = d.user.email")
    List<Donation> findByUser(@Param("mail") String email);

}

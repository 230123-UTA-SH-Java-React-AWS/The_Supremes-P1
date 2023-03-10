package com.revature.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.revature.model.UserAccount;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {

    @Query("SELECT s FROM UserAccount s WHERE s.username = ?1")
    Optional<UserAccount> findByUsername(String username);

    @Query("SELECT s FROM UserAccount s WHERE s.username = ?1 AND s.password = ?2")
    Optional<UserAccount> findByUsernameAndPassword(String username, String password);

    @Query("SELECT s from UserAccount s WHERE s.username = ?1 AND s.sessionToken = ?2")
    Optional<UserAccount> findByUsernameAndSessionToken(String username, String sessionToken);

    @Query("SELECT s from UserAccount s WHERE s.sessionToken = ?1")
    Optional<UserAccount> findBySessionToken(String sessionToken);

    @Query("SELECT s from UserAccount s WHERE s.userAccountId = ?1 AND s.sessionToken = ?2")
    Optional<UserAccount> findByUserAccountIdAndSessionToken(Long userAccountId, String sessionToken);

}

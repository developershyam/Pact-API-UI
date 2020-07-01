package com.sample;

import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.TestTemplate;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.sample.model.User;
import com.sample.service.UserService;

import au.com.dius.pact.provider.junit.Consumer;
import au.com.dius.pact.provider.junit.Provider;
import au.com.dius.pact.provider.junit.State;
import au.com.dius.pact.provider.junit.VerificationReports;
import au.com.dius.pact.provider.junit.loader.PactFolder;
import au.com.dius.pact.provider.junit5.HttpTestTarget;
import au.com.dius.pact.provider.junit5.PactVerificationContext;
import au.com.dius.pact.provider.junit5.PactVerificationInvocationContextProvider;

@Consumer("ui_consumer")
@Provider("api_provider")
@PactFolder("target/pacts")
@VerificationReports
@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ProviderUIPactTest {

	@LocalServerPort
	int localServerPort;

	@MockBean
	private UserService userService;

	@BeforeEach
	void setUp(PactVerificationContext context) {
		context.setTarget(new HttpTestTarget("localhost", localServerPort, "/PactAPI-UI"));
	}

	@TestTemplate
	@ExtendWith(PactVerificationInvocationContextProvider.class)
	void testTemplate(PactVerificationContext context) {
		context.verifyInteraction();
	}

	@State("get all users")
	public void getUsers() {
		List<User> users = java.util.Arrays.asList(new User[] { new User("Developer", "dev@test.org") });
		when(userService.getAllUsers()).thenReturn(users);
	}
}
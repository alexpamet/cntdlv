package com.vicert.slack.aws.controller;

import java.util.Date;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SlackHookController {

	@RequestMapping("/")
	public String home(){
		System.out.println(new Date());
		
		System.out.println("got it!!!");
		return "\"text\": \"You have found me.\"";
	}
}

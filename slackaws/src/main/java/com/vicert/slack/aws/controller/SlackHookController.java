package com.vicert.slack.aws.controller;

import java.util.Date;
import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.vicert.slack.aws.model.HomeResponse;

@RestController
public class SlackHookController {

	@RequestMapping("/")
	public @ResponseBody HomeResponse home(HttpServletRequest request, HttpServletResponse response){
		System.out.println(new Date());
		
		System.out.println("got it!!!");
		HomeResponse resp = new HomeResponse();
		resp.setText("You have found me");
		resp.setUser("gospodinno");
		
		System.out.println(request.getContentType());
		System.out.println(request.getMethod());
		
		Enumeration<String> attributeNames = request.getAttributeNames();
		
		while (attributeNames.hasMoreElements()) {
			String name = attributeNames.nextElement();
			
			System.out.println("Attribute name: " + name + ", attribute value: " + request.getAttribute(name));
		}
	
		Enumeration<String> paramNames = request.getParameterNames();
		
		while (paramNames.hasMoreElements()) {
			String name = paramNames.nextElement();
			
			System.out.println("Param name: " + name + ", param value: " + request.getParameter(name));
		}
		
		
		
		System.out.println(response);
		
		return resp;
	}
}

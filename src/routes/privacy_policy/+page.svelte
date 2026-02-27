<svelte:head>
	<title>Privacy Policy - Time Escape Wiki</title>
</svelte:head>

<div class="container">
	<h1>Privacy Policy</h1>
	<p class="last-updated">Last Updated: 27/02-2026</p>

	<section>
		<h2>1. Introduction</h2>
		<p>
			Welcome to the Time Escape Wiki. This Privacy Policy explains how I
			collect, use, disclose, and safeguard your information when you visit the website.
		</p>
	</section>

	<section>
		<h2>2. Information I Collect</h2>

		<h3>Personal Information</h3>
		<p>I collect personal information that you voluntarily provide to me when you:</p>
		<ul>
			<li>Register for an account</li>
			<li>Log in to the website</li>
			<li>Create, edit, or delete wiki pages</li>
			<li>Contact me via email</li>
		</ul>

		<p>This information may include:</p>
		<ul>
			<li>Username</li>
			<li>Email address</li>
			<li>Password (stored securely using bcrypt hashing)</li>
			<li>Content you create or upload to the wiki</li>
		</ul>

		<h3>Automatically Collected Information</h3>
		<p>
			I use session cookies to maintain your login state. No other information 
            is automatically collected by the website. However, the CDN provider 
            (Cloudflare) may collect basic request data for security and performance purposes.
            For more information on the data collected by Cloudflare, visit 
            <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener">Cloudflare's Privacy Policy</a>.
		</p>
	</section>

	<section>
		<h2>3. How I Use Your Information</h2>
		<p>I use the information collected to:</p>
		<ul>
			<li>Create and manage user accounts</li>
			<li>Authenticate users and provide access to admin features</li>
			<li>Enable admins to create, edit, and manage wiki content</li>
			<li>Process and store uploaded images and media</li>
			<li>Respond to user inquiries and provide support</li>
			<li>Comply with legal obligations</li>
		</ul>
	</section>

	<section>
		<h2>4. Data Storage and Security</h2>
		<p>
			Your information is stored on a secure external MariaDB database hosted on a virtual machine.
			I implement an array of security measures to protect your personal information, including:
		</p>
		<ul>
			<li>Password encryption using bcrypt hashing</li>
			<li>Secure database connections</li>
            <li>Full strict SSL/TLS encryption</li>
		</ul>
		<p>
			However, please note that no method of transmission over the internet or electronic storage is
			100% secure. While I strive to protect your personal information, I cannot guarantee
			absolute security.
		</p>
	</section>

	<section>
		<h2>5. Data Sharing and Disclosure</h2>
		<p>I do not sell, trade, or rent your personal information to third parties.</p>
		<p>I will share your information only in the following circumstances:</p>
		<ul>
			<li>
				<strong>Requested:</strong> If you make a request for viewing your personal information. 
                You may only request information regarding yourself, I will never share your information with other users, 
                unless required by law.
			</li>
			<li>
				<strong>Legal requirements:</strong> If required by law, court order, or other legal processes
			</li>
			<li>
				<strong>Service providers:</strong> With trusted third-party service providers who assist in
				operating the website. This is required in order to offer you the best user experience.
			</li>
		</ul>
	</section>

	<section>
		<h2>6. Cookies and Tracking Technologies</h2>
		<p>
			I use cookies to maintain user sessions and improve your
			experience on the website. Cookies are small data files stored on your device.
		</p>
		<p>You can control cookie preferences through your browser settings.</p>
	</section>

	<section>
		<h2>7. Third-Party Services</h2>
		<p>The website uses the following third-party service:</p>
		<ul>
			<li>
				<strong>Cloudflare:</strong> For content delivery network (CDN) services and DDoS
				protection. Please review
				<a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener"
					>Cloudflare's Privacy Policy</a
				>.
			</li>
		</ul>
		<p>
			I am not responsible for the privacy practices of third-party services, and I encourage you to
			review their privacy policies.
		</p>
	</section>

	<section>
		<h2>8. User Rights</h2>
		<p>You have the right to:</p>
		<ul>
			<li>Access the personal information I hold about you</li>
			<li>Request correction of inaccurate or incomplete information</li>
			<li>Request deletion of your account and associated data</li>
			<li>Object to or restrict certain processing of your information</li>
		</ul>
		<p>
			To exercise these rights, please contact me at
			<a href="mailto:iver.espolin.johnson@gmail.com">iver.espolin.johnson@gmail.com</a>.
		</p>
	</section>

	<section>
		<h2>9. Data Retention</h2>
		<p>
			I retain your voluntary personal information for as long as you have an account, 
            and automatically collected information for as long as necessary to offer you the service.
		</p>
		<p>
			If you want to delete your personal information sooner, you may contact me through email 
            and your personal information will consequently be removed from the databases.
		</p>
	</section>

	<section>
		<h2>10. Changes to This Privacy Policy</h2>
		<p>
			I may update this Privacy Policy from time to time. I will notify you of any changes by
			posting the new Privacy Policy on this page and updating the "Last Updated" date.
		</p>
		<p>
			You are advised to review this Privacy Policy periodically for any changes. Changes are
			effective when posted on this page.
		</p>
	</section>

	<section>
		<h2>11. Contact Me</h2>
		<p>If you have any questions about this Privacy Policy, please contact me:</p>
		<ul>
			<li>
				Email: <a href="mailto:iver.espolin.johnson@gmail.com">iver.espolin.johnson@gmail.com</a>
			</li>
		</ul>
	</section>
</div>

<style>
	.container {
		max-width: 900px;
		margin: 0 auto;
		padding: 2rem;
		line-height: 1.6;
        background-color: antiquewhite;
        border-radius: 20px;
	}

	h1 {
		color: #333;
		border-bottom: 3px solid #4a90e2;
		padding-bottom: 0.5rem;
		margin-bottom: 1rem;
	}

	.last-updated {
		color: #666;
		font-style: italic;
		margin-bottom: 2rem;
	}

	section {
		margin-bottom: 2rem;
	}

	h2 {
		color: #2c3e50;
		margin-top: 2rem;
		margin-bottom: 1rem;
		font-size: 1.5rem;
	}

	h3 {
		color: #34495e;
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
		font-size: 1.2rem;
	}

	p {
		margin-bottom: 1rem;
		color: #444;
	}

	ul {
		margin-bottom: 1rem;
		padding-left: 2rem;
	}

	li {
		margin-bottom: 0.5rem;
		color: #444;
	}

	a {
		color: #4a90e2;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}

	strong {
		color: #2c3e50;
	}

	@media (max-width: 768px) {
		.container {
			padding: 1rem;
		}

		h1 {
			font-size: 1.75rem;
		}

		h2 {
			font-size: 1.3rem;
		}

		h3 {
			font-size: 1.1rem;
		}
	}
</style>

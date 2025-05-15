import React, { useEffect, useState } from "react";
import resumeIcon from "../assets/resume.svg";
import Scaffold from "../components/Scaffold";
import logoSmall from "../assets/logo-transparent.png";

function PrivacyPolicyPage() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	// ------------------->

	return (
		<Scaffold>
			<div className="pt-20 pb-10 lg:px-20 md:px-5 px-5 text-black">
				<div className="max-w-4xl w-full mx-auto bg-white rounded-xl drop-shadow-2xl z-20">
					<div className="flex mt-[17px] items-center justify-between">
						<div className="w-full rounded-t-xl overflow-hidden">
							<img
								src="https://hirehelix.in/logo-180x180.png"
								alt="recruiter-image"
								className=" object-cover mx-auto"
							/>
						</div>
					</div>
					<div className="p-5">
						<h1 className="text-black font-medium text-lg mt-5 text-center">
							<span className="text-blue-700 font-semibold">Hirehelix</span> |{" "}
							MAARS STAFFING AND SECURITY SERVICES (OPC) PRIVATE LIMITED
						</h1>

						<div className="mt-2 items-center text-gray-700 text-[15px] md:text-[17px]">
							<h1 className="mt-5 font-medium text-[17px]">Privacy Policy</h1>
							<p>
								<strong>Effective Date:</strong> 15/05/2025
							</p>
							<p>
								<strong>Company Name:</strong> MAARS STAFFING AND SECURITY
								SERVICES (OPC) PRIVATE LIMITED
							</p>
							<p>
								<strong>Website:</strong> www.hirehelix.in
							</p>
							<br />
							<h2>1. Introduction</h2>
							<p>
								At Hirehelix, we value your privacy and are committed to
								protecting your personal information. This Privacy Policy
								explains how we collect, use, disclose, and safeguard your
								information when you visit our website and use our services.
							</p>
							<br />
							<h2>2. Information We Collect</h2>
							<ul>
								<li>
									<strong>Personal Information:</strong> Name, email, phone
									number, resume, etc.
								</li>
								<li>
									<strong>Usage Data:</strong> IP address, browser type, visited
									pages.
								</li>
								<li>
									<strong>Cookies:</strong> To improve your experience on the
									site.
								</li>
							</ul>
							<br />
							<h2>3. How We Use Your Information</h2>
							<p>
								We use your data to match you with job opportunities, improve
								our services, and communicate with you.
							</p>
							<br />
							<h2>4. Sharing Your Information</h2>
							<p>
								We may share your data with trusted employers or partners. We do
								not sell your personal data.
							</p>
							<br />
							<h2>5. Your Rights</h2>
							<p>
								You can request access, correction, or deletion of your data at
								any time.
							</p>
							<br />
							<h2>6. Contact Us</h2>
							<p>Email: support@hirehelix.in</p>
						</div>
					</div>
				</div>
			</div>
		</Scaffold>
	);
}

export default PrivacyPolicyPage;

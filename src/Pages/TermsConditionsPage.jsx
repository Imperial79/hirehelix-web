import React, { useEffect, useState } from "react";
import resumeIcon from "../assets/resume.svg";
import Scaffold from "../components/Scaffold";
import logoSmall from "../assets/logo-transparent.png";

function TermsConditionsPage() {
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
							<h1 className="mt-5 font-medium text-[17px]">
								Terms & Conditions
							</h1>
							<p>
								Welcome to Hirehelix! By accessing or using our services, you
								agree to these terms.
							</p>
							<br />
							<h2>1. Use of the Platform</h2>
							<p>
								Hirehelix is a job portal for healthcare professionals and
								employers. You must use the platform lawfully and ethically.
							</p>
							<br />
							<h2>2. Account Responsibility</h2>
							<p>
								You are responsible for maintaining the confidentiality of your
								account and password.
							</p>
							<br />
							<h2>3. Content Ownership</h2>
							<p>
								Users retain ownership of their content but grant us the right
								to use it for service delivery.
							</p>
							<br />
							<h2>4. Prohibited Activities</h2>
							<ul>
								<li>
									Posting false or misleading job applications or listings
								</li>
								<li>Using the platform for illegal activities</li>
							</ul>
							<br />
							<h2>5. Termination</h2>
							<p>
								We reserve the right to suspend or terminate access if terms are
								violated.
							</p>
							<br />
							<h2>6. Changes to Terms</h2>
							<p>
								We may update these terms periodically. Continued use indicates
								acceptance.
							</p>
							<br />
							<h2>7. Contact</h2>
							<p>Email: support@hirehelix.in</p>
						</div>
					</div>
				</div>
			</div>
		</Scaffold>
	);
}

export default TermsConditionsPage;

import React, { useEffect, useState } from "react";
import resumeIcon from "../assets/resume.svg";
import Scaffold from "../components/Scaffold";
import logoSmall from "../assets/logo-transparent.png";

function RefundPolicyPage() {
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
							<h1 className="mt-5 font-medium text-[17px]">Refund Policy</h1>
							<p>
								At Hirehelix, our goal is to provide quality service to job
								seekers and employers in the healthcare industry. As most of our
								services involve digital content, refunds are subject to the
								following conditions:
							</p>
							<br />
							<h2>1. Eligibility</h2>
							<p>Refunds may be issued only under the following conditions:</p>
							<ul>
								<li>Duplicate payments made by mistake</li>
								<li>Technical errors preventing service delivery</li>
							</ul>
							<br />

							<h2>2. Non-Refundable Items</h2>
							<p>
								We do not offer refunds for services already rendered, such as:
							</p>
							<ul>
								<li>Resume submissions</li>
								<li>Job posting packages once live</li>
							</ul>
							<br />

							<h2>3. How to Request a Refund</h2>
							<p>
								Please send your request within 7 days of the transaction to{" "}
								<strong>support@hirehelix.in </strong>
								with proof of payment and reason for the refund.
							</p>
							<br />

							<h2>4. Refund Processing</h2>
							<p>
								Approved refunds will be processed within 7–10 business days to
								the original payment method.
							</p>
						</div>
					</div>
				</div>
			</div>
		</Scaffold>
	);
}

export default RefundPolicyPage;

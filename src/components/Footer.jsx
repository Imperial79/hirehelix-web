import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../Helper/ContextProvider";

function Footer() {
	const navigate = useNavigate();
	const location = useLocation();
	let showFooter = true;

	if (location.pathname.includes("dashboard")) {
		showFooter = false;
	}
	return (
		<>
			<div className={`${showFooter ? "" : "hidden"}`}>
				<footer className="bg-gray-900">
					<div className="mx-auto w-full max-w-screen-xl">
						<div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
							<div>
								<h2 className="mb-6 text-sm font-semibold text-white uppercase">
									Hirehelix
								</h2>
								<ul className="text-gray-400 font-medium">
									<li className="mb-4">
										<button
											onClick={() => {
												navigate("/about-contact");
											}}
											className="hover:underline"
										>
											About & Contact
										</button>
									</li>
									<li className="mb-4">
										<button
											onClick={() => {
												navigate("/");
											}}
											className="hover:underline"
										>
											Job Profiles
										</button>
									</li>
									<li className="mb-4">
										<Link to="/jobs-recruiter" className="hover:underline">
											Recruiters
										</Link>
									</li>
								</ul>
							</div>
							<div>
								<h2 className="mb-6 text-sm font-semibold text-white uppercase ">
									Follow us on
								</h2>
								<ul className="text-gray-400 font-medium">
									<li className="mb-4">
										<Link
											to="https://x.com/Hire_helix?t=_MNfVnAiMMwvGYOWtHkm4w&s=08"
											target="_blank"
											className="hover:underline"
										>
											X (Twitter)
										</Link>
									</li>
									<li className="mb-4">
										<Link
											to="https://www.facebook.com/profile.php?id=61555990510206&mibextid=ZbWKwL"
											target="_blank"
											className="hover:underline"
										>
											Facebook
										</Link>
									</li>
								</ul>
							</div>
							<div>
								<h2 className="mb-6 text-sm font-semibold text-white uppercase ">
									Legal
								</h2>
								<ul className="text-gray-400 font-medium">
									<li className="mb-4">
										<Link
											to="/privacy-policy"
											target="_blank"
											className="hover:underline"
										>
											Privacy Policy
										</Link>
									</li>
									<li className="mb-4">
										<Link
											to="/terms-conditions"
											target="_blank"
											className="hover:underline"
										>
											Terms &amp; Conditions
										</Link>
									</li>
									<li className="mb-4">
										<Link
											to="/refund-policy"
											target="_blank"
											className="hover:underline"
										>
											Refund Policy
										</Link>
									</li>
								</ul>
							</div>
							<div>
								<h2 className="mb-6 text-sm font-semibold text-white uppercase ">
									Download
								</h2>
								<ul className="text-gray-400 font-medium">
									<li className="mb-4">
										<Link
											to="https://apps.apple.com/us/app/hirehelix/id6476025143"
											target="_blank"
											className="hover:underline"
										>
											iOS
										</Link>
									</li>
									<li className="mb-4">
										<Link
											to="https://play.google.com/store/apps/details?id=com.jobs.hirehelix&hl=en_IN&gl=US"
											target="_blank"
											className="hover:underline"
										>
											Android
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="px-4 py-6 bg-gray-700 md:flex md:items-center md:justify-between">
						<span className="text-sm text-gray-300 sm:text-center">
							© {new Date().getFullYear()}{" "}
							<Link to="https://hirehelix.in">Hirehelix™</Link>. All Rights
							Reserved.
						</span>
					</div>
				</footer>
			</div>
		</>
	);
}

export default Footer;

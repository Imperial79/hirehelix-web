import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import job from "../assets/job.svg";
import hospital from "../assets/hospital.svg";
import hashTag from "../assets/hash-tag.svg";
import save from "../assets/save.svg";
import date from "../assets/date.svg";
import location from "../assets/location.svg";
import openLinkIcon from "../assets/openLink.svg";
import resumeIcon from "../assets/resume.svg";
import closeIcon from "../assets/close.svg";
import attachmentIcon from "../assets/attachment.svg";
import { dbObject } from "../Helper/Constants";
import { Context } from "../Helper/ContextProvider";
import Scaffold from "../components/Scaffold";
import PillTag from "../components/PillTag";
import Modal from "../components/Modal";
import uploadIcon from "../assets/upload.svg";

function JobDetailPage() {
  const { user, setAlert } = useContext(Context);
  const [loading, setloading] = useState(false);
  let query = new URLSearchParams(useLocation().search);
  const [vacancyData, setvacancyData] = useState({});
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isUploadResumeModalOpen, setIsUploadResumeModalOpen] = useState(false);
  const [resumeList, setresumeList] = useState([]);
  const [selectedResume, setselectedResume] = useState(0);

  const toggleApplyModal = () => {
    setIsApplyModalOpen(!isApplyModalOpen);
  };

  const toggleResumeModal = () => {
    setIsUploadResumeModalOpen(!isUploadResumeModalOpen);
  };

  // ------------------->

  async function fetchJobDetails() {
    try {
      setloading(true);
      const formData = new FormData();
      formData.append("vacancyId", query.get("vacancy-id"));
      const response = await dbObject.post(
        "/vacancy/fetch-vacancy-details.php",
        formData
      );
      if (!response.data.error) {
        setvacancyData(response.data.response);
      }
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  }

  async function fetchResumes() {
    try {
      setloading(true);
      const response = await dbObject.get("/resume/fetch-my-resumes.php");

      if (!response.data.error) {
        setresumeList(response.data.response);
        if (resumeList.length === 0) {
          toggleResumeModal();
        } else {
          toggleApplyModal();
        }
      }
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  }

  useEffect(() => {
    fetchJobDetails();
  }, []);

  return (
    <Scaffold isLoading={loading}>
      <div className="pt-20 pb-10 lg:px-20 md:px-5 px-5 md:grid md:grid-cols-6 md:gap-5 text-black">
        <div className="col-span-4 w-full">
          <div className="justify-start">
            <div className="flex mt-[17px] items-center">
              <div className="md:h-28 h-20">
                <img
                  src={vacancyData.companyImage}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>

              <button className="md:hidden flex gap-2 items-center">
                <img src={save} alt="" className="ml-10 h-5" />
              </button>
            </div>

            <div className="flex mt-10 items-center">
              <h1 className="md:w-[60%] text-blue-900 font-medium md:text-[25px] text-[17px]">
                {vacancyData.roleTitle} | {vacancyData.companyName}
              </h1>
              <button
                type="button"
                className="hidden md:block rounded-full p-3 hover:bg-gray-100 transition-all"
              >
                <img src={save} alt="" className="h-5" />
              </button>
            </div>

            <div className="mt-2 items-center text-gray-700 text-[15px] md:text-[17px]">
              <div className="lg:grid md:grid lg:grid-cols-2 md:grid-cols-2">
                <>
                  <div className="flex items-center gap-2 md:mb-0 mb-4">
                    <img src={hospital} alt="Company Logo" className="h-5" />

                    <Link to={vacancyData.website} target="_blank">
                      <p className="font-normal hover:underline flex items-center gap-2">
                        {vacancyData.companyName}
                        <img src={openLinkIcon} alt="" className="h-4 invert" />
                      </p>
                    </Link>
                  </div>

                  <div className="mt-2 gap-2 flex items-center md:mb-0 mb-4">
                    <img src={location} alt="Company Logo" className="h-5" />
                    <p className="font-normal">
                      {vacancyData.companyCity}, {vacancyData.companyState}
                    </p>
                  </div>
                </>

                <>
                  <div className="flex items-center gap-2 md:mb-0 mb-4">
                    <img src={hashTag} alt="Company Logo" className="h-5" />
                    <p className="font-normal">JOB ID: {vacancyData.id}</p>
                  </div>
                  <div className="mt-2 flex gap-2 items-center md:mb-0 mb-4">
                    <img src={date} alt="Company Logo" className="h-5" />

                    <p className="font-normal ">
                      Posted On:{" "}
                      {new Date(vacancyData.postDate).toLocaleDateString()}
                    </p>
                  </div>
                </>
              </div>

              <div className="my-5">
                {user != null ? (
                  <button
                    type="button"
                    onClick={fetchResumes}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800"
                  >
                    Apply Now
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800 inline-flex items-center gap-2"
                  >
                    Login to Apply
                    <img src={openLinkIcon} alt="" className="h-4" />
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-3 md:gap-5 gap-3">
                <div className="px-5 py-2 bg-blue-50 border border-blue-400 rounded-xl text-center">
                  <h1 className="font-semibold text-xl">
                    {vacancyData.salary}
                  </h1>
                  CTC
                </div>
                <div className="px-5 py-2 bg-blue-50 border border-blue-400 rounded-xl text-center">
                  <h1 className="font-semibold text-xl">
                    {vacancyData.experience}
                  </h1>
                  Experience
                </div>
                <div className="px-5 py-2 bg-blue-50 border border-blue-400 rounded-xl text-center">
                  <h1 className="font-semibold text-xl">
                    {vacancyData.opening}
                  </h1>
                  Openings
                </div>
              </div>

              <DescriptionCard
                title="Requirements"
                content={vacancyData.requirements}
              />
              <DescriptionCard
                title="Preffered Point of Contact"
                content={vacancyData.ppoc}
              />
              <DescriptionCard
                title="Special Note"
                content={vacancyData.specialRemark}
              />
              <DescriptionCard
                title="Employement Type"
                content={vacancyData.employmentType}
              />

              <div className="flex flex-wrap md:mt-5 mt-2 gap-2">
                {vacancyData?.tags?.split("#").map((data, index) => (
                  <div key={index}>
                    <PillTag label={data} />
                  </div>
                ))}
              </div>

              <h1 className="mt-5 font-medium text-[17px]">Attachment</h1>
              <Link
                to={vacancyData.attachment}
                target="_blank"
                className="group hover:bg-black hover:text-white mt-3 bg-gray-50 p-5 rounded-xl font-medium inline-flex items-center gap-5"
              >
                <img
                  src={attachmentIcon}
                  alt="attachment-icon"
                  className="h-5 group-hover:invert"
                />
                {vacancyData.attachmentName}
                <img
                  src={openLinkIcon}
                  alt="openLink-icon"
                  className="group-hover:invert-0 invert h-5"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="col-span-2 mt-6 md:mt-5">
          <div className="flex items-center justify-between mb-5">
            <h1>Jobs by {vacancyData.companyName}</h1>
          </div>

          <Link>
            <div className="border rounded-lg p-2 mb-2 hover:drop-shadow-xl transition duration-400 bg-white">
              <div className="flex items-center">
                <img src={job} alt="Company Logo" className="h-5" />
                <h2 className="ml-3 text-black font-medium max2lines text-sm">
                  Cardiology - Interventional Physician Job with Tenet
                  Healthcare in Memphis, TN
                </h2>
              </div>

              <h2 className="mt-2 text-black text-sm">Memphis, TN</h2>
              <h2 className="mt-1 text-black text-sm">Posted on: 29-03-2022</h2>
            </div>
          </Link>
        </div>
      </div>
      <ApplyJobModal
        isModalOpen={isApplyModalOpen}
        toggleModal={toggleApplyModal}
        setLoading={setloading}
        setAlert={setAlert}
        resumeList={resumeList}
        selectedResume={selectedResume}
        setselectedResume={setselectedResume}
        vacancyId={query.get("vacancy-id")}
      />

      <UploadResumeModal
        isModalOpen={isUploadResumeModalOpen}
        toggleModal={toggleResumeModal}
        setLoading={setloading}
        setAlert={setAlert}
      />
    </Scaffold>
  );
}

export default JobDetailPage;

function DescriptionCard({ title, content }) {
  return (
    <>
      <h1 className="mt-5 font-medium text-[17px]">{title}</h1>
      <h2 className="mt-3 md:text-[15px] text-sm bg-gray-50 border border-gray-200 p-5 rounded-xl">
        {content}
      </h2>
    </>
  );
}

function ResumeCard({ onClick, data, selectedResume }) {
  return (
    <button
      onClick={onClick}
      className={`${
        selectedResume === data.id
          ? "bg-blue-100 border border-blue-500 text-black"
          : "bg-gray-50 border border-blue-50 text-gray-500"
      } px-5 py-4 rounded-xl w-full mb-2 inline-flex gap-2 items-center`}
    >
      <img src={resumeIcon} alt="" className="h-5" />
      {/* <svg ></svg> */}
      {data.resumeName}
    </button>
  );
}

function ApplyJobModal({
  isModalOpen,
  toggleModal,
  setLoading,
  setAlert,
  resumeList,
  selectedResume,
  setselectedResume,
  vacancyId,
}) {
  async function applyJob() {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("vacancyId", vacancyId);
      formData.append("resumeId", selectedResume);
      const response = await dbObject.post(
        "/application/apply-for-vacancy.php",
        formData
      );
      console.log(response.data);
      if (!response.data.error) {
        toggleModal();
      }
      setAlert({
        content: response.data.message,
        isDanger: response.data.error,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <Modal isOpen={isModalOpen} onClose={toggleModal}>
      <h2
        className="font-medium text-lg mb-4 flex justify-between items-center
    "
      >
        Select a resume
        <span
          onClick={toggleModal}
          className="hover:bg-gray-100 p-2 rounded-full"
        >
          <img src={closeIcon} alt="close-icon" className="h-5" />
        </span>
      </h2>
      {resumeList.map((data, index) => (
        <div key={data.id}>
          <ResumeCard
            onClick={() => {
              setselectedResume(data.id);
            }}
            data={data}
            selectedResume={selectedResume}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={applyJob}
        className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800"
      >
        Apply
      </button>
    </Modal>
  );
}

function UploadResumeModal({ isModalOpen, toggleModal, setLoading, setAlert }) {
  const [selectedResume, setselectedResume] = useState(null);

  async function uploadResume() {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("mediaFile", selectedResume);
      formData.append("resumeName", selectedResume.name);
      const response = await dbObject.post(
        "/resume/upload-resume.php",
        formData
      );
      if (!response.data.error) {
        setAlert({
          content: response.data.message,
          isDanger: response.data.error,
        });
        toggleModal();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <Modal isOpen={isModalOpen} onClose={toggleModal}>
      <h2
        className="font-medium text-lg mb-4 flex justify-between items-center
  "
      >
        Upload a resume
        <span
          onClick={toggleModal}
          className="hover:bg-gray-100 p-2 rounded-full"
        >
          <img src={closeIcon} alt="close-icon" className="h-5" />
        </span>
      </h2>
      <input
        type="file"
        name="selectedResume"
        id="selectedResume"
        accept=".pdf, .doc, .docx"
        className="hidden"
        onChange={(e) => {
          setselectedResume(e.target.files[0]);
          console.log(selectedResume);
        }}
      />
      {selectedResume === null ? (
        <>
          <div
            onClick={() => {
              document.getElementById("selectedResume").click();
            }}
            className="mx-auto p-5 w-[70px] h-[70px] bg-gray-50 cursor-pointer"
          >
            <img src={uploadIcon} alt="" />
          </div>
          <h3 className="mx-auto text-center text-sm mt-1">Select resume</h3>
        </>
      ) : (
        <>
          <div className="bg-gray-100 rounded-xl flex gap-1 items-center">
            <div className="w-full flex p-5 gap-2 overflow-hidden whitespace-nowrap text-ellipsis">
              <img src={resumeIcon} alt="" className="h-6" />
              <h1 className="overflow-hidden whitespace-nowrap text-overflow-ellipsis">
                {selectedResume.name}
              </h1>
            </div>

            <img
              src={closeIcon}
              alt="close-icon"
              onClick={() => {
                setselectedResume(null);
              }}
              className="h-6 rounded-full mr-5 object-contain cursor-pointer"
            />
          </div>
        </>
      )}

      <button
        type="button"
        onClick={uploadResume}
        className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800"
      >
        Upload resume
      </button>
    </Modal>
  );
}

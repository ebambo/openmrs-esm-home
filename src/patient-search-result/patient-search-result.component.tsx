import React from "react";
import { match } from "react-router-dom";
import dayjs from "dayjs";
import { interpolateString } from "@openmrs/esm-config";
import { ConfigurableLink, useConfig } from "@openmrs/esm-react-utils";
import styles from "./patient-search-result.scss";

import placeholder from "./placeholder.png";

export interface PatientSearchResultsProps {
  patients: any;
  searchTerm: string;
  match: match;
}

export default function PatientSearchResults(props: PatientSearchResultsProps) {
  const config = useConfig();
  return props.patients.slice(0, 5).map(patient => renderPatient(patient));

  function renderPatient(patient) {
    const preferredIdentifier =
      patient.identifiers.find(i => i.preferred) || patient.identifiers[0];

    return (
      <ConfigurableLink
        key={patient.display}
        className={styles.patientResult}
        to={interpolateString(config.search.patientResultUrl, {
          patientUuid: patient.uuid
        })}
      >
        {/* <span className={styles.resultNumber}>{patient.index}</span> */}
        {/* <div className={styles.patientCard}> */}
        <div>
          <div className={styles.patientBanner}>
            <div className={styles.patientAvatar}>
              <img src={placeholder} alt="Patient avatar" />
            </div>
            <div className={styles.patientInfo}>
              <div className={styles.row}>
                <span className={styles.patientName}>
                  {patient.person.display}
                </span>
              </div>
              <div className={styles.row}>
                <div className={styles.demographics}>
                  <span>
                    {patient.person.gender === "M" ? "Male" : "Female"}
                  </span>{" "}
                  &middot; <span>{patient.person.age} years</span> &middot;{" "}
                  <span>{dayjs(patient.birthdate).format("DD-MMM-YYYY")}</span>
                </div>
              </div>
              <div className={styles.row}>
                <span className={styles.identifiers}>
                  {preferredIdentifier.identifier}
                </span>
              </div>
            </div>
          </div>
        </div>
      </ConfigurableLink>
    );
  }
}

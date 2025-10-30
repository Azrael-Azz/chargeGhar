"use client";

import React, { useState } from "react";
import styles from "./add.module.css";
import { FaCoffee, FaRestroom, FaStore, FaParking, FaCouch } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";

const AddStationPage: React.FC = () => {

  const [stationName, setStationName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [location, setLocation] = useState("");
  const [powerbanks, setPowerbanks] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);

  const amenityOptions = [
    { name: "Cafe", icon: <FaCoffee /> },
    { name: "Toilet", icon: <FaRestroom /> },
    { name: "Lounge", icon: <FaCouch /> },
    { name: "Store", icon: <FaStore /> },
    { name: "Parking", icon: <FaParking /> },
  ];

  const handleAmenityToggle = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleNext = () => {
    alert("Next Step Clicked");
  };

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.header}>
          <h1>Station Details</h1>
          <p>Station / Edit Station Details</p>
        </div>

        <div className={styles.progress}>
          <div className={`${styles.progressStep} ${styles.active}`}>
            <span>1</span> Station Details
          </div>
          <div className={styles.progressStep}>
            <span>2</span> Station Location
          </div>
          <div className={styles.progressStep}>
            <span>3</span> Location Image
          </div>
          <div className={styles.progressStep}>
            <span>4</span> Completed
          </div>
        </div>

        <div className={styles.formSection}>
          <h2>General Information</h2>

          <div className={styles.formGrid}>
            <div>
              <label className={styles.label}>Station Name</label>
              <input
                className={styles.input}
                type="text"
                placeholder="Enter station name"
                value={stationName}
                onChange={(e) => setStationName(e.target.value)}
              />
            </div>
            <div>
              <label className={styles.label}>Capacity</label>
              <input
                className={styles.input}
                type="text"
                placeholder="e.g. 8 Powerbanks"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </div>
            <div>
              <label className={styles.label}>Location</label>
              <input
                className={styles.input}
                type="text"
                placeholder="Enter station location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <label className={styles.label}>Powerbanks Available</label>
              <input
                className={styles.input}
                type="text"
                placeholder="e.g. 4 Powerbanks"
                value={powerbanks}
                onChange={(e) => setPowerbanks(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.amenities}>
            <label className={styles.label}>Nearby Amenities</label>
            <div className={styles.amenityButtons}>
              {amenityOptions.map((a) => (
                <button
                  key={a.name}
                  type="button"
                  className={`${styles.amenityButton} ${amenities.includes(a.name) ? styles.activeAmenity : ""
                    }`}
                  onClick={() => handleAmenityToggle(a.name)}
                >
                  {a.icon}
                  <span>{a.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.nextButton} onClick={handleNext}>
              Next <FiChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Right Side Preview */}
      <div className={styles.preview}>
        <div className={styles.previewBox}></div>
        <div className={styles.previewDetails}>
          <h3>{stationName || "Station Preview"}</h3>
          <p>{location || "Station location will appear here"}</p>
        </div>
      </div>
    </div>
  );
};

export default AddStationPage;
import React, { MouseEventHandler, useEffect, useState } from 'react';
import { p } from 'react-router/dist/development/fog-of-war-Ckdfl79L';

interface CardProps {
  id: string;
  name: string;
  mana_cost: string;
  rarity: string;
  type_line: string;
  image_uris: {
    small: string;
    normal: string;
    large: string;
    png: string;
  };
  isCommander?: boolean;
  action?: string;
  resultForParent?: (cardId: string, action: string) => void;
};

const CardSimple: React.FC<CardProps> = ({ id, image_uris, name, isCommander, action, resultForParent }) => {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    console.log(hovered);
  }, [hovered]);

  const sumImg = "/imgs/sum.svg";
  const restImg = "/imgs/rest.svg";

  if (isCommander) {
    return (
      <div style={{ padding: '1rem' }}>
        <div className="border border-gray-700 rounded" >
          <img src={image_uris.normal} alt={name} className="w-full h-auto" style={{ border: "8px solid rgb(95, 10, 112)", borderRadius: "15px", height: "20rem" }} />
        </div>
      </div>
    );
  }
  else if (resultForParent) {
    if (action == "sum") {
      return (
        <div style={{ padding: '1rem' }}>
          <div className="border border-gray-700 rounded" style={{ position: "relative" }}>
            <img src={image_uris.normal}
              alt={name}
              className="w-full h-auto"
              onClick={() => resultForParent(id, "sum")}
              style={{ height: "20rem", borderRadius: "15px", filter: hovered ? "brightness(50%)" : "none" }}
              onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
            />

            {hovered && (
              <img
                src={sumImg}
                alt="preview"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-60%, -50%)",
                  maxHeight: "50%",
                  maxWidth: "50%",
                  zIndex: 10,
                  borderRadius: "10px",
                }}
                onClick={() => resultForParent(id, "sum")}
                onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
              />
            )}
          </div>
        </div>
      );

    }
    else {
      return (
        <div style={{ padding: '1rem' }}>
          <div className="border border-gray-700 rounded" style={{ position: "relative" }}>
            <img src={image_uris.normal}
              alt={name}
              className="w-full h-auto"
              onClick={() => resultForParent(id, "rest")}
              style={{ height: "20rem", borderRadius: "15px", filter: hovered ? "brightness(50%)" : "none" }}
              onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} />
            {hovered && (
              <img
                src={restImg}
                alt="preview"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-60%, -50%)",
                  maxHeight: "50%",
                  maxWidth: "50%",
                  zIndex: 10,
                  borderRadius: "10px",
                }}
                onClick={() => resultForParent(id, "rest")}
                onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
              />
            )}

          </div>
        </div>
      );
    }
  }
  return null;
};

export default CardSimple;

import React from "react";
import { cities } from "../../cities";

const Cities = ({ obj, setObj, price, setPrice }) => {
    const onInputChange = (e, cit) => {
        setPrice(e);
        setObj((args) => ({ ...args, [cit]: e }));
    };

    return (
        <>
            {cities.map((city) => (
                <tr key={city.id}>
                    <td>{city.name}</td>
                    <td>
                        <input
                            type="number"
                            onChange={(e) =>
                                onInputChange(e.target.value, city.name)
                            }
                            value={
                                obj
                                    ? Object.keys(obj)
                                          .filter((elem) => elem === city.name)
                                          .map((elem) =>
                                              elem === city.name
                                                  ? obj[elem]
                                                  : price
                                          ) || price
                                    : ""
                            }
                        />
                    </td>
                </tr>
            ))}
        </>
    );
};

export default Cities;

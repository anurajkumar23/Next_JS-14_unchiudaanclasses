/* eslint-disable react/prop-types */

export const ResultData = ({ results }) => {
  return (
    <>
      {results.map((userResults, index) => {
        return (
          <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
            <td className="px-6 py-4 border-b  border border-black">
              {userResults.rank}
            </td>
            <td className="px-6 py-4 border-b  border border-black">
              {userResults.username}
            </td>
            {/* <td className="px-6 py-4 border-b  border border-black">{maskedEmail}</td> */}
            <td className="px-6 py-4 border-b  border border-black">
              {userResults.district}
            </td>
            <td className="px-6 py-4 border-b  border border-black">
              {userResults.maskedPhoneNumber}
            </td>
            <td className="px-6 py-4 border-b  border border-black">
              {userResults.totalQuestions}
            </td>
            <td className="px-6 py-4 border-b  border border-black">
              {userResults.correct}
            </td>
            <td className="px-6 py-4 border-b  border border-black">
              {userResults.incorrect}
            </td>
            <td className="px-6 py-4 border-b  border border-black">
              {userResults.notattempt}
            </td>
            <td className="px-6 py-4 border-b  border border-black">
              {userResults.negativemarks}
            </td>
            <td className="px-6 py-4 border-b  border border-black">
              {userResults.score}
            </td>
            <td className="px-6 py-3 border-b  border border-black">
              {userResults.percentage}
            </td>
            <td className="px-6 py-3 border-b  border border-black">
              {userResults.submittime}
            </td>
          </tr>
        );
      })}
    </>
  );
};

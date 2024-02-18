import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const acceptedWaiverBool: boolean =
    data.get("waiver") === "on" && data.get("dataSharing") === "on" && data.get("codeOfConduct") === "on" && data.get("mlhEmails") === "on";

  // Special client-side validation
  if (data.getAll("ethnicity[]").length == 0) {
    // Since HTML5 checkbox doesn't have native client-side validation, we need to manually validate
    return new Response(JSON.stringify({ message: "Please select at least one ethnicity" }), { status: 400 });
  }

  const jsonData = {
    firstName: data.get("firstName") as string,
    lastName: data.get("lastName") as string,
    email: data.get("email") as string,
    phoneNumber: data.get("phoneNumber[full]") as string,
    school: data.get("school") as string,
    country: data.get("country") as string,
    educationLevel: data.get("educationLevel") as string,
    major: data.get("major") as string,
    gender: data.get("gender") as string,
    ethnicity: data.getAll("ethnicity[]") as string[],
    howYouHeard: data.getAll("howYouHeard[]") as string[],
    hackathons: parseInt(data.get("hackathons") as string),
    shirtSize: data.get("shirtSize") as string,
    githubUsername: data.get("githubUsername") as string,
    dateOfBirth: new Date(data.get("dateOfBirth") as string).toISOString(),
    acceptedWaiver: acceptedWaiverBool,
    allergens: /* data.getAll("allergens") as string[] */ [],
    otherAllergens: /* data.get("otherAllergens") as string */ ""
  };

  // Submit a new registrant
  const newRegistrantResponse = await fetch(`${import.meta.env.PUBLIC_API}/api/registrant`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jsonData)
  });

  const responseJson = await newRegistrantResponse.json();

  if (!newRegistrantResponse.ok) {
    // Error
    return new Response(JSON.stringify({ message: responseJson.message }), { status: newRegistrantResponse.status });
  }

  // Response is OK, so now submit the resume (if there is resume file)
  const uploadKey = responseJson.uploadKey;
  let form = new FormData();
  const resumeFile = data.get("resume") as File;
  if (resumeFile) {
    form.append("resume", resumeFile);

    const submitResumeResponse = await fetch(`${import.meta.env.PUBLIC_API}/api/uploadResume/${uploadKey}`, {
      method: "POST",
      body: form
    });


    if (!submitResumeResponse.ok) {
      // const submitResumeResponseJson = await submitResumeResponse.json();
      return new Response(
        JSON.stringify({
          message:
            "There was an error submitting your resume. Please contact us at info@revolutionuc.com and we'll help resolve it for you."
        }),
        { status: submitResumeResponse.status }
      );
    }
  }

  // OK
  return new Response(
    JSON.stringify({ message: "Registered successfully!. Check your email inbox for our email verification process" }),
    { status: 200 }
  );
};

export const convertFilesToBase64 = async (files) => {
	try {
	  const base64Files = await Promise.all(
		Array.from(files).map((file) => {
		  return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
			reader.readAsDataURL(file);
		  });
		})
	  );
	  return base64Files;
	} catch (error) {
	  console.error("Erreur lors de la conversion des fichiers :", error);
	  throw new Error("Impossible de convertir les fichiers en Base64.");
	}
};
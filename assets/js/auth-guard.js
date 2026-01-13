// auth-guard.js - Protection d'accès par session
// Vérifie si l'utilisateur est authentifié via sessionStorage
// Redirige vers index.html si non authentifié

(function () {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated");
  if (isAuthenticated !== "true") {
    // Calcul du chemin relatif vers index.html selon l'emplacement de la page
    const currentPath = window.location.pathname;
    let redirectPath = "index.html";
    
    // Détection du dossier courant pour construire le bon chemin relatif
    if (currentPath.includes("/pages/features/") || 
        currentPath.includes("/pages/guides/") || 
        currentPath.includes("/pages/admin/") || 
        currentPath.includes("/pages/tools/")) {
      redirectPath = "../main/index.html";
    } else if (currentPath.includes("/pages/main/")) {
      redirectPath = "index.html";
    } else {
      // Fallback : chemin depuis la racine
      redirectPath = "pages/main/index.html";
    }
    
    window.location.href = redirectPath;
  }
})();

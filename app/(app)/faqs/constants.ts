export const FAQS = [
  {
    title: "¿Qué requisitos necesita mi dispositivo para usar la aplicación?",
    content:
      "Se recomienda un teléfono móvil con cámara compatible con tecnología de Realidad Aumentada (ARCore o ARKit), conexión a Internet estable y al menos 3 GB de RAM para garantizar un rendimiento fluido durante la visualización de animaciones.",
  },
  {
    title: "¿Por qué las animaciones tardan en cargar o se ven entrecortadas?",
    content:
      "Esto puede deberse a una conexión lenta o inestable. La app descarga los modelos 3D desde el servidor solo la primera vez que se consulta un libro. La segunda vez que se consulta el mismo libro (si no se consultó uno diferente entre medio) las animaciones NO se vuelven a descargar.",
  },
  {
    title: "¿La app consume muchos datos o batería?",
    content:
      "Durante la visualización en RA, el consumo de recursos aumenta debido al uso simultáneo de cámara, sensores y gráficos 3D. Se recomienda usar conexión Wi-Fi y mantener el brillo en nivel medio para optimizar la batería.",
  },
  {
    title:
      "¿Qué significan los distintos estados de una solicitud de alta de libro?",
    content:
      "Si sos profesor, cuando realizás una solicitud desde la app, en la sección “Mis solicitudes” vas a ver un estado asociado a cada pedido:",
    subContent: [
      {
        title: "Pendiente",
        content:
          "La solicitud ya fue enviada y está a la espera de que un administrador la revise.",
      },
      {
        title: "Aprobado",
        content:
          "El administrador aceptó tu solicitud y se planifica o se está realizando la creación de las animaciones, pero todavía no están visibles en la app.",
      },
      {
        title: "Rechazado",
        content:
          "La solicitud no seguirá adelante (por ejemplo, por falta de recursos o por no ajustarse a los lineamientos). En caso de dudas, podés comunicarte con el administrador para más detalles.",
      },
      {
        title: "Publicado",
        content:
          "Las animaciones vinculadas al libro ya fueron cargadas y publicadas; tanto vos como tus alumnos podrán visualizarlas desde la pantalla del libro en la app.",
      },
    ],
  },
  {
    title:
      "¿Por qué algunas animaciones se ven con baja calidad o se distorsionan?",
    content:
      "La calidad de las animaciones puede ajustarse automáticamente según el rendimiento del dispositivo. Si tu teléfono tiene poca memoria libre o un procesador limitado, el sistema prioriza la fluidez visual sobre la resolución. Se recomienda cerrar otras apps abiertas antes de usar VisualizAR.",
  },
  {
    title: "¿Por qué no aparecen algunos libros o animaciones en mi cuenta?",
    content:
      "El contenido disponible depende del rol y curso asignado. Los alumnos solo ven los libros asociados a su clase, y los profesores los vinculados a sus materias. Si falta algún contenido, puede estar pendiente de publicación.",
  },
  ///
  {
    title: "¿Cómo protege la app mis datos personales?",
    content:
      "El sistema utiliza autenticación temporal (OTP) que evita almacenar contraseñas, y la comunicación con el servidor está cifrada mediante HTTPS. No se comparten datos personales con terceros.",
  },
  {
    title: "¿Qué hago si la app se cierra inesperadamente o se congela?",
    content:
      "Verificá que tu dispositivo tenga memoria disponible y que la app esté actualizada. Si el problema continúa, cerrá todas las aplicaciones en segundo plano y reiniciá el dispositivo antes de volver a abrir VisualizAR.",
  },
  {
    title: "¿Cómo se actualizan los contenidos en la app?",
    content:
      "Los administradores cargan y publican las animaciones para la plataforma. Cuando se aprueba una nueva solicitud, la app las descarga automáticamente al estar conectada, sin necesidad de reinstalar.",
  },
  {
    title: "¿La aplicación guarda mi progreso o historial de uso?",
    content:
      "Sí. La app registra de forma local y segura el último libro visualizado y las animaciones reproducidas. Esta información se usa para personalizar tu experiencia y mejorar el rendimiento sin necesidad de conexión constante al servidor.",
  },
];

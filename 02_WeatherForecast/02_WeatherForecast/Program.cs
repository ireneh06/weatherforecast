using Microsoft.OpenApi.Models;  // Für OpenApiInfo und Swagger
using Swashbuckle.AspNetCore.SwaggerGen;  // Für AddSwaggerGen



var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ListenLocalhost(5118); // HTTP
    serverOptions.ListenLocalhost(7108, options => options.UseHttps()); // HTTPS
});

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:9090") // URL aurelia-frontend
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

// Add Controllers (important!)
builder.Services.AddControllers();

// Add Swagger services (important!)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddTransient<HttpClient>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
app.MapControllers();

app.Run();




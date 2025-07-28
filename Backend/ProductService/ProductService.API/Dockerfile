# 🛠 Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY *.sln ./
COPY ProductService.API/*.csproj ./ProductService.API/
COPY ProductService.Application/*.csproj ./ProductService.Application/
COPY ProductService.Domain/*.csproj ./ProductService.Domain/
COPY ProductService.Infrastructure/*.csproj ./ProductService.Infrastructure/

RUN dotnet restore

COPY . .

WORKDIR /src/ProductService.API
RUN dotnet publish ProductService.API.csproj -c Release -o /app/publish

# 🧱 Runtime stage (чистый ASP.NET образ)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "ProductService.API.dll"]

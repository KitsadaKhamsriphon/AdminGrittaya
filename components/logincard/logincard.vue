<template>
  <div role="tablist" class="tabs tabs-lifted">
    <input
      type="radio"
      name="my_tabs_2"
      role="tab"
      class="tab"
      aria-label="Login"
    />
    <div
      role="tabpanel"
      class="tab-content bg-base-100 border-base-300 rounded-box p-6"
    >
      <div class="hero min-h-screen bg-base-200">
        <div class="hero-content flex-col lg:flex-row-reverse">
          <div class="flex-grow">
            <img
              src="~/assets/images/login.png"
              alt="Logo"
              class="w-full h-full rounded"
            />
          </div>
          <div class="card w-full max-w-sm shadow-2xl bg-white">
            <form class="card-body">
              <div class="form-control">
                <label class="label">Username</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  class="input input-bordered"
                  required
                />
              </div>
              <div class="form-control">
                <label class="label">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  class="input input-bordered"
                  required
                />
                <label class="label"
                  ><a href="#" class="label-text-alt link link-hover"
                    >Forgot password?</a
                  ></label
                >
              </div>
              <div class="form-control mt-6">
                <button class="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <input
      type="radio"
      name="my_tabs_2"
      role="tab"
      class="tab"
      aria-label="Register"
      checked
    />
    <div
      role="tabpanel"
      class="tab-content bg-base-100 border-base-300 rounded-box p-6"
    >
      <div class="hero min-h-screen bg-base-200">
        <div class="flex-grow">
          <img
            src="~/assets/images/register.png"
            alt="Logo"
            class="w-full h-full rounded"
          />
        </div>
        <div class="card w-full max-w-sm shadow-2xl bg-white">
          <form class="card-body">
            <div class="form-control">
              <label class="label">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                class="input input-bordered"
                required
              />
            </div>
            <div class="form-control">
              <label class="label">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                class="input input-bordered"
                required
              />
              <label class="label">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                class="input input-bordered"
                required
              />
              <label class="label">Phone Number</label>
              <input
                type="text"
                placeholder="Enter your phone number"
                class="input input-bordered"
                required
              />
            </div>
            <div class="form-control mt-6">
              <button class="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  background-color: #e5e7eb;
}

.card {
  max-width: 24rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  background-color: #fff;
}

.card-body {
  padding: 2rem;
}

.form-control {
  margin-bottom: 1rem;
}

.label {
  display: block;
  margin-bottom: 0.5rem;
}

.input {
  width: 100%;
  padding: 0.75rem;
  border-width: 1px;
  border-style: solid;
  border-color: #d1d5db;
  border-radius: 0.375rem;
}

.label-text-alt {
  font-size: 0.875rem;
}

.link {
  color: #3182ce;
}

.link:hover {
  color: #2c5282;
}

.btn {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #fff;
  background-color: #af0000;
  border-width: 1px;
  border-style: solid;
  border-color: #af0000;
  border-radius: 0.375rem;
}

.btn:hover {
  background-color: #c4222d;
}
</style>
